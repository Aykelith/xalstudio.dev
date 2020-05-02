import React from "react";

export const PostData = {
    title: "The post title",
    date_released: new Date(),
    date_modified: new Date(),
    tags: [ "Tag1", "Tag2" ]
};

export default class TemplatePost extends React.Component {
    render() {
        return (
            <>
                Here comes the content directly
            </>
        )
    }
};