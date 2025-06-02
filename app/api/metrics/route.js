let latestData = {
  stepCount: 0,
  caloriesBurned: 0,
  history: [],
};

export async function GET() {
  return Response.json(latestData);
}

export async function POST(request) {
  const body = await request.json();

  const now = new Date();
  const timestamp = now.toISOString().slice(11, 19); // HH:MM:SS

  // Add new reading to history
  latestData.history.push({
    timestamp,
    steps: body.stepCount,
    calories: body.caloriesBurned,
  });

  // Keep last 12 readings
  if (latestData.history.length > 12) {
    latestData.history.shift();
  }

  // Update current values
  latestData.stepCount = body.stepCount;
  latestData.caloriesBurned = body.caloriesBurned;

  return new Response('OK', { status: 200 });
}
