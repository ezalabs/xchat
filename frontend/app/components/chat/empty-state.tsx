import { MouseEvent } from "react";
import {
  Heading,
  Link,
  Card,
  CardHeader,
  Flex,
  Spacer,
} from "@chakra-ui/react";

const sampleQuestions: string[] = [
  "What is ESDT?",
  "What SDKs are available?",
  "How to install mxpy?",
  "How to use webwallet?",
];

export function EmptyState(props: { onChoice: (question: string) => any }) {
  const handleClick = (e: MouseEvent) => {
    props.onChoice((e.target as HTMLDivElement).innerText);
  };

  const QuestionCard = (props: { text: string, key: string | number }) => {

    const { text, key } = props;

    return (
      <Card
        key={key}
        onMouseUp={handleClick}
        width={"48%"}
        backgroundColor={"rgba(35, 246, 218, 0.08)"}
        _hover={{ backgroundColor: "rgba(35, 246, 218, 0.23)" }}
        cursor={"pointer"}
        justifyContent={"center"}
      >
        <CardHeader key={key} justifyContent={"center"}>
          <Heading
            key={key}
            fontSize="lg"
            fontWeight={"medium"}
            mb={1}
            color={"gray.200"}
            textAlign={"center"}
          >
            {text}
          </Heading>
        </CardHeader>
      </Card>
    );
  };

  function renderSampleQuestions(): JSX.Element {
    let tempIndex = 0;

    return (
      <>
        {sampleQuestions.map(function (value) {
          return (
            <>
              {tempIndex != sampleQuestions.length && (
                <Flex
                  key={tempIndex}
                  marginTop={"25px"}
                  grow={1}
                  maxWidth={"800px"}
                  width={"100%"}
                >
                  <QuestionCard
                    key={tempIndex}
                    text={sampleQuestions[tempIndex++]}
                  />
                  <Spacer />
                  <QuestionCard
                    key={tempIndex}
                    text={sampleQuestions[tempIndex++]}
                  />
                </Flex>
              )}
            </>
          );
        })}
      </>
    );
  }

  return (
    <div className="rounded flex flex-col items-center max-w-full md:p-8">
      <Heading
        fontSize="xl"
        fontWeight={"normal"}
        color={"white"}
        marginTop={"10px"}
        textAlign={"center"}
      >
        Ask me anything about MultiversX&apos;s{" "}
        <Link
          href="https://docs.multiversx.com/"
          target="_blank"
          color={"#20f6d8"}
        >
          documentation!
        </Link>
        <p className="s">Example questions:</p>
      </Heading>
      {renderSampleQuestions()}
    </div>
  );
}
