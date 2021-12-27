import { Meta, Story } from "@storybook/react";
import { SelectBox, Props } from "../components/SelectBox";

export default {
  title: "SelectBox",
  component: SelectBox,
} as Meta;

const Template: Story<Props> = (args) => <SelectBox {...args} />;

export const Default: Story<Props> = Template.bind({});
Default.args = {
  label: "Default",
  value: "テスト1",
  options: [
    { id: "1", name: "テスト1" },
    { id: "2", name: "テスト2" },
    { id: "3", name: "テスト3" },
    { id: "4", name: "テスト4" },
  ],
};
Default.storyName = "デフォルト";
