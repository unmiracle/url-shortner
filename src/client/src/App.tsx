import {
  Button,
  Card,
  DatePicker,
  Flex,
  Form,
  Input,
  Space,
  Typography,
} from "antd";
import { SendOutlined } from "@ant-design/icons";
import { useCreateUrl } from "./hooks/useCreateUrl";
import { onError } from "./utils/api-error-message";
import dayjs from "dayjs";
import { CreateUrlDto } from "./dto/create-url.dto";
import { URL } from "./models/url.model";
import { useState } from "react";

const { Link } = Typography;

function App() {
  const [form] = Form.useForm();
  const [createdUrl, setCreatedUrl] = useState<URL | null>(null);

  const { mutateAsync: createUrl } = useCreateUrl();

  const onFinish = async (values: CreateUrlDto) => {
    try {
      if (values.expiresAt) {
        // @ts-expect-error test
        values.expiresAt = values.expiresAt.toISOString();
      }

      await createUrl(
        // @ts-expect-error test
        { ...values },
        {
          onError,
          onSuccess: (data: URL) => {
            console.log("data success", data);
            setCreatedUrl({ ...data });
            form.resetFields();
          },
        },
      );
    } catch (error) {
      console.error(error);
    }
  };

  const disabledDate = (current: dayjs.Dayjs): boolean => {
    return current && current < dayjs().startOf("day");
  };

  return (
    <>
      <Flex
        style={{ height: "100%" }}
        justify="center"
        align="center"
        gap="middle"
        flex="1"
      >
        <Card style={{ minWidth: 500 }} title="URL Shortener">
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              name="originalUrl"
              label="Original URL"
              rules={[{ required: true }, { type: "url" }, { type: "string" }]}
            >
              <Input placeholder="URL" />
            </Form.Item>
            <Form.Item name="alias" label="Alias" rules={[{ type: "string" }]}>
              <Input placeholder="Desired short url alias" />
            </Form.Item>
            <Form.Item name="expiresAt" label="Expires at">
              <DatePicker
                disabledDate={disabledDate}
                format="DD-MM-YYYY HH:mm"
                showTime
              />
            </Form.Item>
            <Form.Item>
              <Space>
                <Button
                  icon={<SendOutlined />}
                  type="primary"
                  htmlType="submit"
                >
                  Submit
                </Button>
              </Space>
            </Form.Item>
          </Form>
          {createdUrl && (
            <Card type="inner" title="Your shortened URL">
              <Link
                copyable
              >{`http://localhost:3000/${createdUrl?.alias ? createdUrl.alias : createdUrl.shortUrl}`}</Link>
              {/* <Space.Compact size="large" style={{ width: "100%" }}>
                <Input
                  type="url"
                  value={`http://localhost:3000/${createdUrl?.alias ? createdUrl.alias : createdUrl.shortUrl}`}
                />
                <Button icon={<CopyOutlined />} type="primary">
                  Copy
                </Button>
              </Space.Compact> */}
            </Card>
          )}
        </Card>
      </Flex>
    </>
  );
}

export default App;
