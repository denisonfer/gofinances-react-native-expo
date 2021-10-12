export default interface IProps {
  title: string;
  amount: string;
  lasTransaction: string;
  type: 'up' | 'down' | 'total';
}