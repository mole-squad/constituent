export function profile(req, res) {
  const { user } = req;

  res.json({ 
    name: user.facebook.name
  });
}