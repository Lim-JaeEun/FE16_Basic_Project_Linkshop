import styled from 'styled-components';

import defaultProfileImg from '../assets/img/img_profile_full.svg';

const DEFAULT_SIZE = '60px';

const StProfileImage = styled.img`
  border-radius: 9999px;
  object-fit: cover;
  object-position: center;
  aspect-ratio: 1/1;
`;

const ProfileImage = ({ src = defaultProfileImg, size = DEFAULT_SIZE }) => {
  return (
    <StProfileImage
      src={src}
      alt='링크샵 프로필 이미지'
      width={size}
      height={'auto'}
    />
  );
};

export default ProfileImage;
