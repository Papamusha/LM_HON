import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";

function GuidePage() {
    return (
        <Container>
            <body>
                <h1>How to Use:</h1>
                <h2>Selecting a graph</h2>
                <p>Use the navbar located above to navigate to the data visualisation method you would like to apply to the dataset.</p> <br/>
                <h2>Selecting a search term</h2>
                <p>Due to this web-app being a functioning prototype and not the final product, users cannot yet directly input a search term and instead select a term using the dropdown menu located above the graph.</p>
                <h2>Selecting a time period</h2>
                <p>All graphs have a histogram attached below, use your mouse to highlight regions and scroll through time.</p>
            </body>
        </Container>
    );
}

export default GuidePage;