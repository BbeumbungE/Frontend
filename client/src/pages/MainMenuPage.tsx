import Button from '../components/atoms/Button';
import Menu from '../components/atoms/Menu';
import WhiteModal from '../components/atoms/WhiteModal';

function MainMenuPage() {
  return (
    <div>
      <h1>Home Page</h1>
      <Button buttonText="salmon" color="salmon" />
      <Button buttonText="blue" color="blue" />
      <Button buttonText="green" color="green" />
      <Button buttonText="lightGreen" color="lightGreen" />
      <Button buttonText="reverseGreen" color="reverseGreen" />
      <Button buttonText="transparency" color="transparency" />
      <Button buttonText="yellow" color="yellow" />
      <Button buttonText="gray" color="gray" />
      <Button buttonText="darkGray" color="darkGray" />
      <Menu buttonText="pink" color="pink" />
      <Menu buttonText="green" color="green" />
      <Menu buttonText="yellow" color="yellow" />
      <Menu buttonText="blue" color="blue" />
      <Menu buttonText="mint" color="mint" />
      <Menu buttonText="borderPinkborderPinkborderPink" color="borderPink" />
      <Menu buttonText="borderGreen" color="borderGreen" />
      <WhiteModal modalText="이름을 지어주세요!" height={300} />
    </div>
  );
}

export default MainMenuPage;
