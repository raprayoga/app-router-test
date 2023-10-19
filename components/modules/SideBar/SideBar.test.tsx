import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Button from "./index";
import { RouterContext } from "next/dist/shared/lib/router-context.shared-runtime";
import SideBar from "./index";
import { createMockRouter } from "@/test-utils/createMockRouter";

describe("Sidebar test", () => {
  const setup = (props: React.ComponentProps<typeof Button>) => {
    const router = createMockRouter({});
    const utils = render(
      <RouterContext.Provider value={router}>
        <SideBar {...props} />
      </RouterContext.Provider>
    );
    return { ...utils, router };
  };

  test("Sould handle link", async () => {
    const user = userEvent.setup();
    const { router } = setup({});

    await user.click(screen.getByText("Article"));
    expect(router.push).toHaveBeenCalled();
  });
});
