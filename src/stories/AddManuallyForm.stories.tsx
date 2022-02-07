import type { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { AddManuallyForm } from "../components/Lunch/AddManuallyForm";
import { action } from "@storybook/addon-actions";

export default {
  component: AddManuallyForm,
  render: () => {
    return (
      <div className="max-w-xl w-5/6 mx-auto py-5">
        <AddManuallyForm cansel={action("cansel")} />
      </div>
    );
  }
} as ComponentMeta<typeof AddManuallyForm>;

// 名前付きエクスポートはデフォルトでストーリーオブジェクトを表す
export const Default: ComponentStoryObj<typeof AddManuallyForm> = {
  args: {
    cansel: action("cansel"),
  },
  // storyName: "デフォルト",
};
