import { Group, NumberInput, Input, TextInput } from "@mantine/core";
import { InputWrapper } from "@mantine/core/lib/Input/InputWrapper/InputWrapper";
import React, { useMemo, useRef } from "react";

type Props = {
  value: string;
  valueLength: number;
  onChange: (value: string) => void;
};

const RE_DIGIT = new RegExp(/^\d+$/);

const OtcInput = ({ value, valueLength, onChange }: Props) => {
  const ref = useRef<HTMLInputElement>(null);
  const valueItems = useMemo(() => {
    const valueArray = value.split("");
    const items: Array<string> = [];
    for (let i = 0; i < valueLength; i++) {
      const char = valueArray[i];
      if (RE_DIGIT.test(char)) {
        items.push(char);
      } else {
        items.push("");
      }
    }
    return items;
  }, [value, valueLength]);

  const focusToNextInput = (target: HTMLElement) => {
    const nextElementSibling =
      target.nextElementSibling as HTMLInputElement | null;

    if (nextElementSibling) {
      nextElementSibling.focus();
    }
  };
  const focusToPrevInput = (target: HTMLElement) => {
    const previousElementSibling =
      target.previousElementSibling as HTMLInputElement | null;

    if (previousElementSibling) {
      previousElementSibling.focus();
    }
  };

  const inputOnChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) => {
    const target = e.target;
    let targetValue = target.value.trim();
    const isTargetValueDigit = RE_DIGIT.test(targetValue);

    if (!isTargetValueDigit && targetValue !== "") {
      return;
    }

    const nextInputEl = target.nextElementSibling as HTMLInputElement | null;
    // only delete digit if next input element has no value
    if (!isTargetValueDigit && nextInputEl && nextInputEl.value !== "") {
      return;
    }

    targetValue = isTargetValueDigit ? targetValue : " ";

    const targetValueLength = targetValue.length;

    if (targetValueLength === 1) {
      const newValue =
        value.substring(0, idx) + targetValue + value.substring(idx + 1);

      onChange(newValue);

      if (!isTargetValueDigit) {
        return;
      }

      focusToNextInput(target);
    } else if (targetValueLength === valueLength) {
      onChange(targetValue);

      target.blur();
    }
  };
  const inputOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = e;
    const target = e.target as HTMLInputElement;

    if (key === "ArrowRight" || key === "ArrowDown") {
      e.preventDefault();
      return focusToNextInput(target);
    }

    if (key === "ArrowLeft" || key === "ArrowUp") {
      e.preventDefault();
      return focusToPrevInput(target);
    }

    const targetValue = target.value;

    // keep the selection range position
    // if the same digit was typed
    target.setSelectionRange(0, targetValue.length);

    if (e.key !== "Backspace" || targetValue !== "") {
      return;
    }

    focusToPrevInput(target);
  };
  const inputOnFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const { target } = e;
    // keep focusing back until previous input
    // element has value
    const prevInputEl =
      target.previousElementSibling as HTMLInputElement | null;

    if (prevInputEl && prevInputEl.value === "") {
      return prevInputEl.focus();
    }

    target.setSelectionRange(0, target.value.length);
  };

  return (
    <Group position="center" mt="lg">
      {valueItems.map((digit, idx) => (
        <input
          autoFocus
          key={idx}
          ref={ref}
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          pattern="\d{1}"
          maxLength={valueLength}
          value={digit}
          style={{
            fontFamily: "inherit",
            width: 32,
            textAlign: "center",
            border: 0,
            borderBottom: "1px solid ",

            outline: 0,
            // color: "#868e96",
          }}
          // styles={{ input: { width: 54, textAlign: "center" } }}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            inputOnChange(e, idx)
          }
          onKeyDown={inputOnKeyDown}
          onFocus={inputOnFocus}
        />
      ))}
    </Group>
  );
};

export default OtcInput;
