import { styled } from '@mui/material/styles';
import TreeView from '@mui/lab/TreeView';
import TreeItem, { TreeItemProps, treeItemClasses } from '@mui/lab/TreeItem';
import {
  Typography,
  Box,
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Theme,
  SxProps,
} from '@mui/material';
import {
  ArrowRight as ArrowRightIcon,
  ArrowDropDown as ArrowDropDownIcon,
  LocalOffer as LocalOfferIcon,
  Label as LabelIcon,
  Edit as EditIcon,
} from '@mui/icons-material';
import { SvgIconProps } from '@mui/material/SvgIcon';
import { useProgTests } from '@src/store/reducers/progTests/useProgTests.hook';
import { FC, useMemo, useState } from 'react';

declare module 'react' {
  interface CSSProperties {
    '--tree-view-color'?: string;
    '--tree-view-bg-color'?: string;
  }
}

type StyledTreeItemProps = TreeItemProps & {
  bgColor?: string;
  color?: string;
  labelIcon: React.ElementType<SvgIconProps>;
  labelText: string;
  onClick?: () => void;
};
//(nodeId: string, label: string) =>
const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
  color: theme.palette.text.secondary,
  [`& .${treeItemClasses.content}`]: {
    color: theme.palette.text.secondary,
    borderTopRightRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    '&.Mui-expanded': {
      fontWeight: theme.typography.fontWeightRegular,
    },
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
    '&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused': {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
      color: 'var(--tree-view-color)',
    },
    [`& .${treeItemClasses.label}`]: {
      fontWeight: 'inherit',
      color: 'inherit',
    },
  },
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 0,
    [`& .${treeItemClasses.content}`]: {
      paddingLeft: theme.spacing(2),
    },
  },
}));

function StyledTreeItem(props: StyledTreeItemProps) {
  const { bgColor, color, labelIcon: LabelIcon, labelText, ...other } = props;

  return (
    <StyledTreeItemRoot
      label={
        <Box sx={{ display: 'flex', alignItems: 'center', p: 0.5, pr: 0 }}>
          <Box component={LabelIcon} color="inherit" sx={{ mr: 1 }} />
          <Typography variant="body2" sx={{ fontWeight: 'inherit', flexGrow: 1 }}>
            {labelText}
          </Typography>
        </Box>
      }
      style={{
        '--tree-view-color': color,
        '--tree-view-bg-color': bgColor,
      }}
      {...other}
    />
  );
}
interface CategorySelectorProps {
  defaultValue?: string;
  onChange?: (value: string) => void;
  sx?: SxProps<Theme>;
}

const CategorySelector: FC<CategorySelectorProps> = ({ defaultValue, onChange, sx }) => {
  const { loading, error, data } = useProgTests();
  const [title, setTitle] = useState('');
  const [open, setOpen] = useState(false);

  const onNodeSelectHangler = (nodeId: string, label: string) => {
    setTitle(label);
    handleClose();
    if (onChange) onChange(nodeId);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const defaultExpanded = useMemo(() => {
    return data
      ? data
          .filter(
            (item) =>
              item.childs.filter((child) => {
                if (child._id === defaultValue) {
                  setTitle(child.title);
                  return true;
                }
              }).length > 0
          )
          .map((it) => it._id)
      : [];
  }, [defaultValue, data]);

  return (
    <>
      <Box sx={{ ...sx }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography component="div" variant="caption">
            Категория:
          </Typography>
          <Typography component="div" fontWeight={500} sx={{ mx: 1 }}>
            {loading
              ? 'Загрузка данных...'
              : error
              ? 'Ошибка загрузки, повторите позже.'
              : title || 'Не выбрано'}
          </Typography>
          {data && (
            <IconButton color="secondary" onClick={handleClickOpen}>
              <EditIcon />
            </IconButton>
          )}
        </Box>
      </Box>
      {data && (
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Категория: {title || 'Не выбрано'}</DialogTitle>
          <DialogContent>
            <TreeView
              defaultExpanded={defaultExpanded}
              defaultSelected={defaultValue}
              defaultCollapseIcon={<ArrowDropDownIcon />}
              defaultExpandIcon={<ArrowRightIcon />}
              defaultEndIcon={<div style={{ width: 24 }} />}
              sx={{ minHeight: 300, flexGrow: 1, maxWidth: 400, minWidth: 300, overflowY: 'auto' }}
            >
              {data.map((directProgramming) => (
                <StyledTreeItem
                  nodeId={directProgramming._id}
                  labelText={directProgramming.title}
                  labelIcon={LabelIcon}
                  key={directProgramming._id}
                >
                  {directProgramming.childs.map((directProgrammingСhapter) => (
                    <StyledTreeItem
                      key={directProgrammingСhapter._id}
                      nodeId={directProgrammingСhapter._id}
                      labelText={directProgrammingСhapter.title}
                      labelIcon={LocalOfferIcon}
                      color="#3c8039"
                      bgColor="#e6f4ea"
                      data-select={true}
                      onClick={() =>
                        onNodeSelectHangler(directProgrammingСhapter._id, directProgrammingСhapter.title)
                      }
                    />
                  ))}
                </StyledTreeItem>
              ))}
            </TreeView>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Отмена</Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default CategorySelector;
