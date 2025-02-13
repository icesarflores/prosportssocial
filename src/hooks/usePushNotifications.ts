import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import { supabase } from "@/lib/supabase";

export function usePushNotifications() {
  const [permission, setPermission] =
    useState<NotificationPermission>("default");
  const [subscription, setSubscription] = useState<PushSubscription | null>(
    null,
  );
  const { user } = useAuth();

  useEffect(() => {
    checkPermission();
    if ("serviceWorker" in navigator) {
      registerServiceWorker();
    }
  }, []);

  const checkPermission = () => {
    if ((!"Notification") in window) return;
    setPermission(Notification.permission);
  };

  const registerServiceWorker = async () => {
    try {
      const registration = await navigator.serviceWorker.register("/sw.js");
      const subscription = await registration.pushManager.getSubscription();
      if (subscription) {
        setSubscription(subscription);
        await saveSubscription(subscription);
      }
    } catch (error) {
      console.error("Error registering service worker:", error);
    }
  };

  const requestPermission = async () => {
    if ((!"Notification") in window) return;

    try {
      const permission = await Notification.requestPermission();
      setPermission(permission);

      if (permission === "granted") {
        const registration = await navigator.serviceWorker.ready;
        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: import.meta.env.VITE_VAPID_PUBLIC_KEY,
        });

        setSubscription(subscription);
        await saveSubscription(subscription);
      }
    } catch (error) {
      console.error("Error requesting notification permission:", error);
    }
  };

  const saveSubscription = async (subscription: PushSubscription) => {
    if (!user) return;

    try {
      const { error } = await supabase.from("push_subscriptions").upsert([
        {
          user_id: user.id,
          subscription: JSON.stringify(subscription),
        },
      ]);

      if (error) throw error;
    } catch (error) {
      console.error("Error saving push subscription:", error);
    }
  };

  const unsubscribe = async () => {
    if (!subscription || !user) return;

    try {
      await subscription.unsubscribe();
      setSubscription(null);

      const { error } = await supabase
        .from("push_subscriptions")
        .delete()
        .eq("user_id", user.id);

      if (error) throw error;
    } catch (error) {
      console.error("Error unsubscribing from push notifications:", error);
    }
  };

  return {
    permission,
    subscription,
    requestPermission,
    unsubscribe,
  };
}
