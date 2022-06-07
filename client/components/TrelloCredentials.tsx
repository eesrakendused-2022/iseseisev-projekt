import React, { ReactElement } from "react";
import styled from "styled-components";

interface Props {
    trelloKey: string,
    trelloToken: string,
    onKeyChanged(value: string): void,
    onTokenChanged(value: string): void,
    onValidate(): void,
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

const Button = styled.button`
    border: none;
    width: 100px;
    height: 30px;
    align-self: center;
    font-family: "Poppins", sans-serif;
    cursor: pointer;
    margin-top: 10px;
`;

export function TrelloCredentials(props: Props): ReactElement {
    return (
        <Container>
            <label>
                Trello key:
                <input
                    value={props.trelloKey}
                    type="text"
                    onChange={(event) => props.onKeyChanged(event.target.value)}
                >
                </input>
                <br />
            </label>
            <label>
                Trello token:
                <input
                    value={props.trelloToken}
                    type="text"
                    onChange={(event) => props.onTokenChanged(event.target.value)}
                >
                </input>
                <br />
            </label>
            <Button onClick={() => props.onValidate()}>Enter</Button>
        </Container>
    );
}
