import Image from 'next/image';
import { useRouter } from 'next/router';
import styled from 'styled-components';

interface Props {
  name: string;
  id: string;
  imgSrc: string;
}

const BoardPreviewContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 60px;

  cursor: pointer;

  &:hover {
    background-color: #ededed;
  }
`;

const BoardPreviewContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;

  width: 100%;
  height: 100%;
`;

const BoardPreviewImage = styled.div`
  width: 60px;
  height: 45px;
  border-radius: 2px;
  background-color: #d4d4d4;
`;

const BoardPreviewLine = styled.hr`
  width: 100%;
  height: 1px;
  background-color: #8d8d8d;
  border: none;
`;

export default function BoardPreview({ name, id, imgSrc }: Props): JSX.Element {
  const router = useRouter();
  const handleClick = () => {
    router.push(`boards/${id}`);
  };
  return (
    <BoardPreviewContainer onClick={handleClick}>
      <BoardPreviewContent>
        <BoardPreviewImage>
          <Image src={imgSrc} alt="Preview image" width={60} height={45} className="w-full h-full object-fit" />
        </BoardPreviewImage>
        <div>
          <p>{name}</p>
        </div>
      </BoardPreviewContent>
      <BoardPreviewLine />
    </BoardPreviewContainer>
  );
}
