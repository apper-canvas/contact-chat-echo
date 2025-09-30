import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { AuthContext } from "../../App";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Header = ({ title, onMenuClick, className, children }) => {
  const { logout } = useContext(AuthContext);
  const { user } = useSelector((state) => state.user);

  return (
    <header className={cn(
      "bg-white border-b border-secondary-200 px-4 lg:px-6 py-4",
      className
    )}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onMenuClick}
            className="lg:hidden"
          >
            <ApperIcon name="Menu" className="w-5 h-5" />
          </Button>
          {title && (
            <h1 className="text-xl font-bold text-secondary-900">{title}</h1>
          )}
        </div>
        <div className="flex items-center space-x-4">
          {user && (
            <div className="flex items-center space-x-3">
              <span className="text-sm font-medium text-secondary-700">
                {user.firstName} {user.lastName}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                className="flex items-center space-x-2"
              >
                <ApperIcon name="LogOut" className="w-4 h-4" />
                <span>Logout</span>
              </Button>
            </div>
          )}
          {children}
        </div>
      </div>
    </header>
  );
};

export default Header;