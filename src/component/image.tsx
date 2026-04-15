interface ImageProps {
  imageUrl: string;
}

const Image: React.FC<ImageProps> = ({ imageUrl }) => {
    return <img src={imageUrl}  />;
};

export default Image;