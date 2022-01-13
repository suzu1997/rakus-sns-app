import { Meta, Story } from "@storybook/react";
import { MenuBar } from "../components/Layout/MenuBar";

export default {
  title: "MenuBar",
  component: MenuBar,
} as Meta;

const Template: Story = (args) => <MenuBar {...args} />;

export const Default: Story = Template.bind({});
Default.args = {
  label: "Default",
};
Default.storyName = "デフォルト";
