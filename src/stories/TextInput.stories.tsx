import { Meta, Story } from "@storybook/react";
import { TextInput, Props } from "../components/TextInput";

export default {
  title: "TextInput",
  component: TextInput,
} as Meta;

const Template: Story<Props> = (args) => <TextInput {...args} />;

export const Default: Story<Props> = Template.bind({});
Default.args = {
  label: "Default",
  placeholder: "〇〇を入力してください。",
};
Default.storyName = "デフォルト";

export const Required: Story<Props> = Template.bind({});
Required.args = {
  label: "Required",
  value: "",
  fullWidth: true,
  type: "text",
  required: true,
};
Required.storyName = "必須項目";

export const UserName: Story<Props> = Template.bind({});
UserName.args = {
  label: "アカウント名",
  value: "",
  fullWidth: true,
  type: "text",
  required: true,
};
UserName.storyName = "ユーザー名";

export const Email: Story<Props> = Template.bind({});
Email.args = {
  label: "メールアドレス",
  value: "",
  fullWidth: true,
  type: "email",
  required: true,
};
Email.storyName = "メールアドレス";

export const Password: Story<Props> = Template.bind({});
Password.args = {
  label: "パスワード",
  value: "",
  fullWidth: true,
  type: "password",
  required: true,
};
Password.storyName = "パスワード";

export const FirstName: Story<Props> = Template.bind({});
FirstName.args = {
  label: "姓",
  value: "",
  fullWidth: false,
  type: "text",
  required: true,
};
FirstName.storyName = "姓";
