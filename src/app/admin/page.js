import AdminPage from "@/components/AdminPage";
import { operationsChecklist } from "@/lib/workshop-data";

export const metadata = {
  title: "관리자 문의 목록",
};

export default function Page() {
  return <AdminPage operationsChecklist={operationsChecklist} />;
}
