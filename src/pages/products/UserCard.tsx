import { User } from '@/services/apis/products/useGetPaginatedUsers';
import * as Theme from './Theme';

interface UserCardProps {
    user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => (
    <Theme.ProductItem key={user.id}>
        <img src={user.avatar} alt={`${user.first_name} ${user.last_name}`} />
        <div>
            {user.first_name} {user.last_name}
        </div>
    </Theme.ProductItem>
);

export default UserCard;
