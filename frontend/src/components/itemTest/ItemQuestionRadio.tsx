import { FC, ChangeEvent, SetStateAction,Dispatch } from 'react';
import { Radio, RadioGroup, FormControlLabel } from '@mui/material';
import { HtmlTextToReact } from '@src/components';
import { AnswerDTO } from '@src/types/models';


export interface ItemQuestionRadioProps {
  answers: AnswerDTO[];
  setAnswersId: Dispatch<SetStateAction<string[]>>;
  clearErrorHangler: () => void;
}

const ItemQuestionRadio: FC<ItemQuestionRadioProps> = ({ answers, setAnswersId, clearErrorHangler }) => {
 

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAnswersId([(event.target as HTMLInputElement).value]);
    clearErrorHangler();      
  };

  return (    
      <RadioGroup
        onChange={handleChange}
      >
        {answers.map((answer)=> 
          <FormControlLabel key={answer._id} value={answer._id} control={<Radio />} label={<HtmlTextToReact htmlText={answer.answer}/>} />
        )}        
      </RadioGroup>    
  );
};

export default ItemQuestionRadio;
