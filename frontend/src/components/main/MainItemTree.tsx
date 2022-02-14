import { FC, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, IconButton, Stack } from '@mui/material';
import { TreeView, TreeItem } from '@mui/lab';

import {
  ExpandMore as ExpandMoreIcon,
  ChevronRight as ChevronRightIcon,
  Edit as EditIcon,
} from '@mui/icons-material';

import { getLinkByRoutePath } from '@src/router/appRouterSettings';
import {
  BaseDTO,
  BaseParentIdDTO,
  DirectProgrammingTestDTO,
  DirectProgrammingСhapterDTO,
  TypeNameEnum,
} from '@src/types/models';
import { useAppActions } from '@src/store/useRedux.hook';
import { DeleteBtnEdit, SwitchEdit, TextFieldEditHOC } from '..';
import { CallbackSaveFieldCompleteData, useMutationApp } from '@src/api/useMutationApp.hook';

export interface MainItemTreeProps {
  data: DirectProgrammingСhapterDTO[];
  edit?: boolean;
  parentId: string;
}

const MainItemTree: FC<MainItemTreeProps> = ({ data, edit, parentId }) => {
  const navigate = useNavigate();
  const { mutationFieldProgTest, mutationProgTest, mutationDeleteProgTest } = useAppActions();
  const { callbackSaveField, callbackDelete } = useMutationApp();

  const handleStopPropagation = (event: MouseEvent<HTMLElement>) => event.stopPropagation();

  const emptyText = 'В этот раздел еще не добавлено';

  const handleGoTo = (event: MouseEvent<HTMLElement>, to: string) => {
    handleStopPropagation(event);
    navigate(to);
  };

  const handleAddTest = <DTO extends BaseDTO>(props: CallbackSaveFieldCompleteData<DTO>) => {
    mutationProgTest(props);
    navigate(getLinkByRoutePath('TEST_EDIT_PAGE', props.data._id));
  };

  return (
    <Box sx={{ flexGrow: 1, maxWidth: 900, overflowY: 'auto' }}>
      <TreeView
        aria-label="controlled"
        sx={{ mb: 3 }}
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        onClick={handleStopPropagation}
      >
        {data.map((itemGr) => (
          <TreeItem
            nodeId={itemGr._id}
            label={
              edit ? (
                <Stack direction="row" spacing={1} justifyContent="flex-start" alignItems="center">
                  <TextFieldEditHOC
                    dataInput={itemGr.title}
                    callbackSaveField={callbackSaveField<
                      Pick<DirectProgrammingСhapterDTO, '_id' | 'title'> & BaseParentIdDTO
                    >({
                      _id: itemGr._id,
                      parentId,
                      additionalData: { parentId },
                      fieldName: 'title',
                      typeName: TypeNameEnum.DIRECT_PROGRAMMING_CHARTER,
                      onComplete: mutationFieldProgTest,
                    })}
                  >
                    <>{itemGr.title}</>
                  </TextFieldEditHOC>
                  <TextFieldEditHOC
                    dataInput={''}
                    add={true}
                    label="Добавить тест"
                    callbackSaveField={callbackSaveField<DirectProgrammingTestDTO>({
                      _id: '',
                      parentId: itemGr._id,
                      fieldName: 'title',
                      additionalData: { categoryId: itemGr._id },
                      typeName: TypeNameEnum.DIRECT_PROGRAMMING_TEST,
                      onComplete: handleAddTest,
                    })}
                  />
                  <SwitchEdit
                    dataInput={itemGr.status}
                    callbackSaveField={callbackSaveField<
                      Pick<DirectProgrammingСhapterDTO, '_id' | 'status'>,
                      boolean
                    >({
                      _id: itemGr._id,
                      parentId,
                      fieldName: 'status',
                      typeName: TypeNameEnum.DIRECT_PROGRAMMING_CHARTER,
                      onComplete: mutationFieldProgTest,
                    })}
                  />
                  <DeleteBtnEdit
                    callbackDelete={callbackDelete({
                      _id: itemGr._id,
                      typeName: TypeNameEnum.DIRECT_PROGRAMMING_CHARTER,
                      onComplete: mutationDeleteProgTest,
                    })}
                  />
                </Stack>
              ) : (
                itemGr.title
              )
            }
            key={itemGr._id}
          >
            {itemGr.childs.length === 0 && <TreeItem nodeId={itemGr._id + '_'} label={emptyText} />}
            {itemGr.childs.map((itemTest) => (
              <TreeItem
                nodeId={itemTest._id}
                label={
                  edit ? (
                    <Stack direction="row" spacing={1} justifyContent="flex-start" alignItems="center">
                      <div>{itemTest.title}</div>
                      <IconButton
                        size="small"
                        onClick={(ev) => handleGoTo(ev, getLinkByRoutePath('TEST_EDIT_PAGE', itemTest._id))}
                      >
                        <EditIcon />
                      </IconButton>
                      <SwitchEdit
                        dataInput={itemTest.status}
                        callbackSaveField={callbackSaveField<
                          Pick<DirectProgrammingTestDTO, '_id' | 'status'>,
                          boolean
                        >({
                          _id: itemTest._id,
                          parentId: itemGr._id,
                          fieldName: 'status',
                          typeName: TypeNameEnum.DIRECT_PROGRAMMING_TEST,
                          onComplete: mutationFieldProgTest,
                        })}
                      />
                      <DeleteBtnEdit
                        callbackDelete={callbackDelete({
                          _id: itemTest._id,
                          typeName: TypeNameEnum.DIRECT_PROGRAMMING_TEST,
                          onComplete: mutationDeleteProgTest,
                        })}
                      />
                    </Stack>
                  ) : (
                    itemTest.title
                  )
                }
                key={itemTest._id}
                onClick={(ev) => handleGoTo(ev, getLinkByRoutePath('TEST_PAGE', itemTest._id))}
              />
            ))}
          </TreeItem>
        ))}
      </TreeView>
    </Box>
  );
};

export default MainItemTree;
