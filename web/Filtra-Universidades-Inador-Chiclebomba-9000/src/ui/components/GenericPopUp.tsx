import React, { useState, useEffect } from "react";
import { Alert, Button } from "@chakra-ui/react";

/**
 * Props for the Alert component.
 */
interface AlertProps {
  /**
   * The message to display in the alert.
   */
  message: string;

  /**
   * The title of the alert.
   */
  title: string;

  /**
   * The status of the alert, which determines its style.
   *
   * Valid values:
   * - `"info"`: Informational message
   * - `"warning"`: Warning message
   * - `"success"`: Success message
   * - `"error"`: Error message
   * - `"neutral"`: Neutral message
   */
  status: AlertStatus;

  /**
   * Whether the alert is open.
   */
  isOpen: boolean;
}

type AlertStatus = "info" | "warning" | "success" | "error" | "neutral";

function GenericPopUp({ message, status, title, isOpen }: AlertProps) {
    const [isVisible, setIsVisible] = useState(isOpen);

    useEffect(() => {
      if (isOpen) {
        setIsVisible(true); // Show the alert immediately when open
      } else {
        // Delay hiding to allow fade-out animation
        const timeout = setTimeout(() => setIsVisible(false), 300); // 300ms matches animation time
        return () => clearTimeout(timeout);
      }
    }, [isOpen]);
  
    if (!isVisible) return null; // Prevent unmounting until fade-out completes
  
    return (
        <Alert.Root
        status={status}
        w={"30%"}
        m={"auto"}
        mt={5}
        data-state={isOpen ? "open" : "closed"}
        _open={{
          animation: "fade-in 300ms ease-out",
        }}
        _closed={{
          animation: "fadeOut 300ms ease-in",
        }}
      >
        <Alert.Indicator />
        <Alert.Content>
          <Alert.Title>{title}</Alert.Title>
          <Alert.Description>{message}</Alert.Description>
        </Alert.Content>
      </Alert.Root>
    );
  }

export default GenericPopUp;
