
import RenderFollow from "./RenderFollow";
import FollowContainer from "./FollowContainer";


 const followers = useSelector((state) => state.session.followers);
 const following = useSelector((state) => state.session.following);

  let followingContent;
  let followersContent;

//Maps content for users that the session user is being followed by
followersContent = (
  <FollowContainer title={"Who is Following You"}>
    {followers.map((follow) => (
      <RenderFollow key={nanoid()} {...follow} />
    ))}
  </FollowContainer>
);

//Maps content for users the session user is following
followingContent =
  following.length === 0 ? (
    <div>Following No One</div>
  ) : (
    <FollowContainer title={"Who You are Following"}>
      {following.map((follow) => (
        <RenderFollow key={nanoid()} {...follow} />
      ))}
    </FollowContainer>
  );
