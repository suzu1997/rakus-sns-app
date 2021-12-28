import { Meta, Story } from "@storybook/react";
import { MenuBar, Props } from "../components/MenuBar";

export default {
  title: "MenuBar",
  component: MenuBar,
} as Meta;

const Template: Story<Props> = (args) => <MenuBar {...args} />;

export const Default: Story<Props> = Template.bind({});
Default.args = {
  label: "Default",
};
Default.storyName = "デフォルト";
