import { render, screen } from "@/test-utils";
import { AllStaff } from "../AllStaff";


// import { render, screen } from "@/test-utils";

test("renders response from query", async () => {

  render(<AllStaff />);

  const staffs = await screen.findAllByRole("heading", {name: /divya|mateo|sandra/i});
  
  expect(staffs.length).eq(3)
  
});
