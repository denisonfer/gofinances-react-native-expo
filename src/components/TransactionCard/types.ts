interface ICategory {
  name: string;
  icon: string;
}

export interface ITransactionCardProps {
  type: 'positive' | 'negative';
  title: string;
  amount: string;
  category: ICategory;
  date: string;
}

export interface IProps {
  data: ITransactionCardProps;
}