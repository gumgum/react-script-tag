import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import ScriptTag from "../ScriptTag";
import { ScriptLoaderProps } from "../ScriptTag";

describe("<ScriptTag />", () => {
    test("should display script tag element, as well as a custom render jsx element", async () => {
        const { findByTestId } = renderScriptTag();
        const scriptTag = await findByTestId("script-tag-generated-tag");
        const customRender = await findByTestId("custom-render");
        expect(scriptTag).toBeDefined();
        expect(customRender).toBeDefined();

        const hisHonorableForm = await findByTestId("his-honorable-form");
        expect(hisHonorableForm).toHaveFormValues({
            "honorable-input-username": "Edward Falesetien",
        });
    });
});

function renderScriptTag() {
    const props: ScriptLoaderProps = {
        src: "https://ercaws.com/time",
        debug: true,
        renderScript: true,
        "data-testid": "script-tag-generated-tag",
        render: (
            <div data-testid="custom-render">
                <form data-testid="his-honorable-form">
                    <label htmlFor="honorable-input-username">Name:</label>
                    <input
                        title="honorable-input"
                        name="honorable-input-username"
                        type="text"
                        data-testid="his-honorable-input"
                        value="Edward Falesetien"
                    />
                </form>
            </div>
        ),
    };

    return render(<ScriptTag {...props} />);
}
