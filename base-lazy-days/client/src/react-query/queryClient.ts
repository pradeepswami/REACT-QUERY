import { toast } from "@/components/app/toast";
import { QueryCache, QueryClient, QueryClientConfig } from "@tanstack/react-query";


export const queryClientOptions : QueryClientConfig = {
  defaultOptions: {
      queries: {
          staleTime: 60000,
          gcTime: 90000
      }
  },
  queryCache: new QueryCache({
      onError: (error) => errorHandler(error.message)
  })
};

function errorHandler(errorMsg: string) {
//   // https://chakra-ui.com/docs/components/toast#preventing-duplicate-toast
//   // one message per page load, not one message per query
//   // the user doesn't care that there were three failed queries on the staff page
//   //    (staff, treatments, user)
   const id = "react-query-toast";

   if (!toast.isActive(id)) {
     const action = "fetch";
     const title = `could not ${action} data: ${
       errorMsg ?? "error connecting to server"
     }`;
     toast({ id, title, status: "error", variant: "subtle", isClosable: true });
   }
 }

export default new QueryClient( queryClientOptions);