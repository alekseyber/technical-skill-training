import { FC, useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MainItemTree from './MainItemTree';
import {
  TypeNameEnum,
  DirectProgrammingDTO,
  DirectProgrammingСhapterDTO,
  BaseDTO,
  BaseParentIdDTO,
} from '@src/types/models';
import { DeleteBtnEdit, SwitchEdit, TextFieldEditHOC } from '@src/components';
import { CallbackSaveFieldCompleteData, useMutationApp } from '@src/api/useMutationApp.hook';
import { useAppActions } from '@src/store/useRedux.hook';

interface MainItemProps {
  data: DirectProgrammingDTO;
  edit?: boolean;
}

const MainItem: FC<MainItemProps> = ({ data, edit = false }) => {
  const [expanded, setExpanded] = useState(false);
  const { callbackSaveField, callbackDelete } = useMutationApp();
  const { mutationFieldProgTest, mutationDeleteProgTest, mutationProgTest } = useAppActions();
  const emptyText = 'К сожалению в этом разделе пока нет тем.';

  const handleAdd = <DTO extends BaseDTO>(props: CallbackSaveFieldCompleteData<DTO>) => {
    mutationProgTest(props);
    setExpanded(true);
  };

  return (
    <Accordion sx={{ my: 3 }} expanded={expanded} onClick={() => setExpanded((prev) => !prev)}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        {edit ? (
          <>
            <TextFieldEditHOC
              dataInput={data.title}
              callbackSaveField={callbackSaveField<Pick<DirectProgrammingDTO, '_id' | 'title'>>({
                _id: data._id,
                fieldName: 'title',
                typeName: TypeNameEnum.DIRECT_PROGRAMMING,
                onComplete: mutationFieldProgTest,
              })}
            >
              <Typography variant="h4" component="div">
                {data.title}
              </Typography>
            </TextFieldEditHOC>
            <SwitchEdit
              dataInput={data.status}
              callbackSaveField={callbackSaveField<Pick<DirectProgrammingDTO, '_id' | 'status'>, boolean>({
                _id: data._id,
                fieldName: 'status',
                typeName: TypeNameEnum.DIRECT_PROGRAMMING,
                onComplete: mutationFieldProgTest,
              })}
            />
            <TextFieldEditHOC
              dataInput={''}
              add={true}
              label="Имя темы"
              callbackSaveField={callbackSaveField<DirectProgrammingСhapterDTO & BaseParentIdDTO>({
                _id: '',
                parentId: data._id,
                fieldName: 'title',
                additionalData: { parentId: data._id },
                typeName: TypeNameEnum.DIRECT_PROGRAMMING_CHARTER,
                onComplete: handleAdd,
              })}
            />
            <DeleteBtnEdit
              callbackDelete={callbackDelete({
                _id: data._id,
                typeName: TypeNameEnum.DIRECT_PROGRAMMING,
                onComplete: mutationDeleteProgTest,
              })}
            />
          </>
        ) : (
          <Typography variant="h4" component="div">
            {data.title}
          </Typography>
        )}
      </AccordionSummary>
      <AccordionDetails>
        {data.childs.length ? (
          <MainItemTree data={data.childs} edit={edit} parentId={data._id} />
        ) : (
          <Typography component="div">{emptyText}</Typography>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default MainItem;
