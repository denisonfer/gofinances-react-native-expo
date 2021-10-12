interface ICategory {
  name: string;
  icon: string;
}

export default interface ITransactionCardProps {
  type: 'positive' | 'negative';
  title: string;
  amount: string;
  category: ICategory;
  date: string;
}

export default interface IProps {
  data: ITransactionCardProps;
}