import { CardContent } from "@mui/material"

import { Link } from "@mui/material"

import { Avatar } from "@mui/material"
import { Card, CardHeader } from "@mui/material"
import { GitHubUser } from "../types"
import { Typography } from "../../shared/components/Typography"

type UserCardProps = {
  user: GitHubUser
}

export const UserCard = ({ user }: UserCardProps) => {
  return <Card>
  <CardHeader
    avatar={
      <Avatar src={user.avatar_url} alt={user.login} />
    }
    title={
      <Link href={user.html_url} target="_blank" rel="noopener noreferrer" underline="hover">
        {user.login}
      </Link>
    }
    subheader={`Type: ${user.type}`}
  />
  <CardContent>
    <Typography variant="body2" color="text.secondary">
      Score: {user.score.toFixed(2)}
    </Typography>
  </CardContent>
</Card>
}