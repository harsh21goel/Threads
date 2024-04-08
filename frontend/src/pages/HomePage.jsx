import { Button, Flex } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <Link to={"/mark"}>
        <Flex w={"full"} justifyContent={"center"}>
            <Button mx={"auto"}  > Go to profile page</Button>
        </Flex>
    </Link>
  )
}

export default HomePage