import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { TextInput } from "../components/Form/TextInput";

export default {
  title: "TextInput",
  component: TextInput,
} as ComponentMeta<typeof TextInput>;

const Template: ComponentStory<typeof TextInput> = (args) => (
  <TextInput {...args} />
);

export const Default: ComponentStory<typeof TextInput> = Template.bind({});
Default.args = {
  label: "Default",
  placeholder: "〇〇を入力してください。",
};
Default.storyName = "デフォルト";

export const Required: ComponentStory<typeof TextInput> = Template.bind({});
Required.args = {
  label: "Required",
  value: "",
  fullWidth: true,
  type: "text",
  required: true,
};
Required.storyName = "必須項目";

export const UserName: ComponentStory<typeof TextInput> = Template.bind({});
UserName.args = {
  label: "アカウント名",
  value: "",
  fullWidth: true,
  type: "text",
  required: true,
};
UserName.storyName = "ユーザー名";

export const Email: ComponentStory<typeof TextInput> = Template.bind({});
Email.args = {
  label: "メールアドレス",
  value: "",
  fullWidth: true,
  type: "email",
  required: true,
};
Email.storyName = "メールアドレス";

export const Password: ComponentStory<typeof TextInput> = Template.bind({});
Password.args = {
  label: "パスワード",
  value: "",
  fullWidth: true,
  type: "password",
  required: true,
};
Password.storyName = "パスワード";

export const FirstName: ComponentStory<typeof TextInput> = Template.bind({});
FirstName.args = {
  label: "姓",
  value: "",
  fullWidth: false,
  type: "text",
  required: true,
};
FirstName.storyName = "姓";
