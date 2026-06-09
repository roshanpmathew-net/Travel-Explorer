import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/AuthContext";

const LoginDropDown = () => {
const { user, logout } = useAuth();
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          
          <div>
             <div className="flex items-center gap-3">
                <img
                  src={user?.img_url ?? "./images/user.webp"}
                  alt={user?.name}
                  title={user?.name}
                  className="h-10 w-10 rounded-full cursor-pointer border"
                />
              </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>

            {
              user?.isAdmin && (
                <DropdownMenuItem>
                <a href="/admin">Admin Panel</a>
               </DropdownMenuItem>
              )
            }
            
            <DropdownMenuItem>
                <a href="/profile">Profile</a>
            </DropdownMenuItem>
            <DropdownMenuItem variant="destructive" className={'cursor-pointer'} onClick={logout}>
                Logout
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default LoginDropDown;
