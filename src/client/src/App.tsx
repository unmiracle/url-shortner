import { Button, Card, Flex, Input, Space } from "antd";
import { SendOutlined, CopyOutlined } from "@ant-design/icons";
const defaultUrl =
  "https://www.google.com/search?q=asdasd&oq=asdasd&gs_lcrp=EgZjaHJvbWUyBggAEEUYOdIBBzMyMmowajeoAgCwAgA&sourceid=chrome&ie=UTF-8";
function App() {
  return (
    <>
      <Flex
        style={{ height: "100%" }}
        justify="center"
        align="center"
        gap="middle"
        flex="1"
      >
        <Card style={{ minWidth: 500 }} title="Url Shortner">
          <Space.Compact size="large" style={{ width: "100%" }}>
            <Input type="url" defaultValue={defaultUrl} />
            <Button icon={<SendOutlined />} type="primary">
              Submit
            </Button>
          </Space.Compact>
          {/* <Card type="inner" title="Your shortened URL">
            <Space.Compact size="large" style={{ width: "100%" }}>
              <Input type="url" defaultValue="Combine input and button" />
              <Button icon={<CopyOutlined />} type="primary">
                Copy
              </Button>
            </Space.Compact>
          </Card> */}
        </Card>
      </Flex>
    </>
  );
}

export default App;
