import { Card as CardRoot } from './Card';
import { CardHeader as Header } from './CardHeader';
import { CardTitle as Title } from './CardTitle';
import { CardSubtitle as Subtitle } from './CardSubtitle';

export const Card = Object.assign(CardRoot, { Header, Title, Subtitle });
