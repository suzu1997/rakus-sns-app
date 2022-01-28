import { Meta, Story } from "@storybook/react";
import { PostModal, Props } from "../components/Modal/PostModal";

export default {
  title: "PostModal",
  component: PostModal,
} as Meta;

const Template: Story<Props> = (args) => <PostModal {...args} />;

export const Default: Story<Props> = Template.bind({});

Default.args = {
  isOpen: true,
  closeModal: () => {
    alert("モーダルを閉じる");
  },
  title: "つぶやき",
  success: () => {
    alert("成功しました");
  },
};
Default.storyName = "デフォルト";

export const Timeline: Story<Props> = Template.bind({});
Timeline.args = {
  isOpen: true,
  closeModal: () => {
    alert("モーダルを閉じる");
  },
  title: "つぶやき",
  success: () => {
    alert("呟きました");
  },
};
