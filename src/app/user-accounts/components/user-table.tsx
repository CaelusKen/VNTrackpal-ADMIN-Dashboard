import type React from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { User } from "@/types/user";
import { StatusBadge } from "@/components/reuse/badge/status-badge";

interface UserTableProps {
  users: User[];
  searchTerm: string;
  onDisableUser: (id: number) => void;
}

interface UserAccountStatus {
  status: "active" | "inactive" | "banned";
}

interface UserSubscriptionStatus {
  subscription: "free" | "premium";
}

const UserStatus: React.FC<UserAccountStatus> = ({ status }) => {
  return (
    <StatusBadge
      state={
        status === "active"
          ? "success"
          : status === "inactive"
          ? "warning"
          : "error"
      }
    >
      {status}
    </StatusBadge>
  );
};

const UserSubscription: React.FC<UserSubscriptionStatus> = ({
  subscription,
}) => {
  return (
    <StatusBadge
      state={
        subscription === "free"
          ? "success"
          : subscription === "premium"
          ? "warning"
          : "error"
      }
    >
      {subscription}
    </StatusBadge>
  );
};

const UserTable: React.FC<UserTableProps> = ({
  users,
  searchTerm,
  onDisableUser,
}) => {
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Subscription</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <UserStatus status={user.status} />
              </TableCell>
              <TableCell>
                <UserSubscription subscription={user.subscription} />
              </TableCell>
              <TableCell>
                <Button onClick={() => onDisableUser(user.id)}>
                  {user.status === "active" ? "Disable" : "Enable"}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserTable;
