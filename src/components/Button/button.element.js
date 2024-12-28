import styled from 'styled-components';

export const Wrapper = styled.button`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 100px;
    padding: 9px 16px;
    border-radius: 4px;
    font-size: 1.6rem;
    font-weight: 700;
    font-family: var(--font-family);
    cursor: pointer;
    background-color: var(--white);
    border: 1px solid transparent;
    user-select: none;

    &.disabled {
        pointer-events: none;
        opacity: 0.5;
    }
`;

export const Icon = styled.span`
    display: inline-block;
    width: 24px;
    text-align: center;

    & + .title,
    .title + & {
        margin-left: 1px;
    }
`;

export const GradientOne = styled(Wrapper)`
    background-image: linear-gradient(45deg, #00fbff, #0c507c);
    color: #fff;
    border-radius: 10px;
    border: 0;
    font-weight: 500;
    font-size: 1.4rem;
`;

export const GradientTwo = styled(Wrapper)`
    background-image: linear-gradient(45deg, #a80076, #0c507c);
    color: #fff;
    border-radius: 10px;
    border: 0;
    font-weight: 500;
    font-size: 1.4rem;
`;

export const Submit = styled(Wrapper)`
    background-color: #00d3d6;
    color: #fff;
    border-radius: 10px;
    font-weight: 500;
    font-size: 1.6rem;
    border: 0;

    &:hover {
        background-color: #2197E3;
    }
`;

export const SubmitTwo = styled(Wrapper)`
    background-color: #609799;
    color: #fff;
    border-radius: 10px;
    font-weight: 500;
    font-size: 1.6rem;
    border: 0;

    &:hover {
        background-color:rgb(15, 167, 172);
    }
`;

export const SubmitThree = styled(Wrapper)`
    background-color: #00d3d6;
    color: #fff;
    border-radius: 10px;
    font-weight: 500;
    font-size: 1.6rem;
    border: 0;
    width: 80px;
    height: 40px;
`;

export const Rounded = styled(Wrapper)`
    border-radius: 999px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    background-color:#00D3D6;
    color: #fff;

    &:hover {
        background-color: #2197E3;
    }

    &:disabled {
        cursor: default;
        background-color:rgba(84, 205, 207, 0.74);
    }
`;

export const Circle = styled(Wrapper)`
    border-radius: 999px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    width: 20px;
    height: 20px;
    padding: 9px;
    background-color:#00D3D6;
    color: #fff;

    &:hover {
        background-color: #2197E3;
    }
`;

export const Primary = styled(Wrapper)`
    color: var(--white);
    background-color: #00D3D6;
    border-radius: 10px;

    &:hover {
        background-color: #2197E3;
    }

    &:disabled {
        cursor: default;
        background-color:rgba(84, 205, 207, 0.74);
        &:hover {
            background-color:rgba(84, 205, 207, 0.74);
        }
    }
`;

export const Outline = styled(Wrapper)`
    color: var(--primary);
    border-color: currentColor;

    &:hover {
        background-color: rgba(254, 44, 85, 0.06);
    }
`;

export const Text = styled(Wrapper)`
    color: var(--white);
    background-color: transparent;
    font-weight: 500;
    font-size: 1.4rem;
    padding: 9px 2px;

    &:hover {
        text-decoration: underline;
    }
`;

export const Nav = styled(Wrapper)`
    font-weight: 500;
    font-size: 1.6rem;
    color: #005a5c;
    padding: 9px 2px;

    &:hover {
        background: #eee;
    }
`;

// Button size variants
export const Small = styled(Wrapper)`
    min-width: 88px;
    padding: 4px 16px;
`;

export const Large = styled(Wrapper)`
    padding: 14px 100px;
    min-width: 140px;
`;

export const Medium = styled(Wrapper)`
    padding: 9px 40px;
    min-width: 110px;
`;

export const Long = styled(Wrapper)`
    min-width: 740px;
    padding: 10px 30px;
`;
