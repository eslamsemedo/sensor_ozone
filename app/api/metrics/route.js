let latestData = {
  stepCount: 0,
  caloriesBurned: 0,
  history: [],
};
let trigger = false;

export async function GET() {
  if (trigger) {
    trigger = false
    return Response.json(latestData);

  } else {
    return Response.json("empty")
  }
}

export async function POST(request) {
  trigger = true
  const body = await request.json();

  const now = new Date();
  const timestamp = now.toISOString().slice(11, 19); // HH:MM:SS
  // Add new reading to history
  latestData.history.push({
    timestamp,
    steps: parseInt(body.stepCount),
    calories: body.caloriesBurned,
  });
  console.log(typeof body.caloriesBurned)
  console.log(Number(body.caloriesBurned))
  // Keep last 12 readings
  if (latestData.history.length > 12) {
    latestData.history.shift();
    // Update current values
  }
  latestData.stepCount = parseInt(body.stepCount);
  latestData.caloriesBurned = body.caloriesBurned;


  return new Response('OK', { status: 200 });
}
