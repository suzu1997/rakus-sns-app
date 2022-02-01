import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { SelectBox } from "../components/Form/SelectBox";

export default {
  title: "SelectBox",
  component: SelectBox,
} as ComponentMeta<typeof SelectBox>;

const Template: ComponentStory<typeof SelectBox> = (args) => <SelectBox {...args} />;

export const Default: ComponentStory<typeof SelectBox> = Template.bind({});
Default.args = {
  label: "Default",
  selectedOption: { id: "1", name: "テスト1" },
  options: [
    { id: "1", name: "テスト1" },
    { id: "2", name: "テスト2" },
    { id: "3", name: "テスト3" },
    { id: "4", name: "テスト4" },
  ],
};
Default.storyName = "デフォルト";
