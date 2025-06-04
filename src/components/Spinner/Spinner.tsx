import { Flex, Spin } from "antd";
import type { FunctionComponent } from "react";

const Spinner: FunctionComponent = () => (
  <Flex
    align='center'
    justify='center'
    style={{
      height: '100vh'
    }}
  >
    <Spin size='large'  />
  </Flex>
)

export default Spinner
