import { FC, ChangeEvent } from 'react';
import { ItemQuestionRadioProps } from './ItemQuestionRadio';
import { Checkbox, FormGroup, FormControlLabel } from '@mui/material';
import { HtmlTextToReact } from '@src/components';


const ItemQuestionCheckboxes: FC<ItemQuestionRadioProps> = ({ answers, setAnswersId, clearErrorHangler }) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setAnswersId((prev) => [...prev, event.target.value]);
      clearErrorHangler();
    } else {
      setAnswersId((prev) => prev.filter((item) => item !== event.target.value));
    }

  };

  return (
    <FormGroup>
      {answers.map((answer) => (
        <FormControlLabel
          key={answer._id}
          control={<Checkbox onChange={handleChange} value={answer._id} />}
          label={<HtmlTextToReact htmlText={answer.answer} />}
        />
      ))}
    </FormGroup>
  );
};

export default ItemQuestionCheckboxes;
