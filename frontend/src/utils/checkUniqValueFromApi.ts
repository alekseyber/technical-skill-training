import { HttpClient } from '@src/api/HttpClient';
import { GetValidUniqKeysEnum, GetValidUniqDTO, TypeNameEnum, ValidUniqRezultDTO } from '@src/types/models';

export const checkUniqValueFromApi = async (
  value: string,
  key: GetValidUniqKeysEnum,
  _id?: string
): Promise<boolean> => {
  try {
    return true
    const { data } = await HttpClient.getAppAPI<ValidUniqRezultDTO, GetValidUniqDTO>(
      TypeNameEnum.VALID_UNIQ,
      { [key]: value.trim(), _id }
    );

    return !!data[key];
  } catch (e) {
    //console.error(e);
    return true;
  }
};
