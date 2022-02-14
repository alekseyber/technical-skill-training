import { SetMetadata } from '@nestjs/common';

export const USER_ITEM_KEY = 'useritem';
export const UserItem = () => SetMetadata(USER_ITEM_KEY, true);
