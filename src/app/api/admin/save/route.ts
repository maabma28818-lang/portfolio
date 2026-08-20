import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const token = process.env.GITHUB_TOKEN;
    const owner = process.env.GITHUB_OWNER;
    const repo = process.env.GITHUB_REPO;
    const path = 'src/data/portfolio-data.json';

    if (!token || !owner || !repo) {
      console.error('Missing GitHub credentials in environment variables.');
      return NextResponse.json({ success: false, error: 'Server misconfiguration' }, { status: 500 });
    }

    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;

    // 1. Fetch current file to get the SHA
    const getRes = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Accept': 'application/vnd.github.v3+json',
      },
    });

    let sha: string | undefined;

    if (getRes.ok) {
      const fileData = await getRes.json();
      sha = fileData.sha;
    } else if (getRes.status !== 404) {
      // If it's not a 404, there was an unexpected error
      throw new Error(`Failed to fetch file from GitHub: ${getRes.statusText}`);
    }

    // 2. Commit and push the updated data
    const content = Buffer.from(JSON.stringify(data, null, 2)).toString('base64');

    const putRes = await fetch(apiUrl, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'cms: update portfolio data from admin dashboard',
        content,
        sha,
      }),
    });

    if (!putRes.ok) {
      const errorData = await putRes.text();
      console.error('GitHub API PUT error:', errorData);
      throw new Error(`Failed to commit file to GitHub: ${putRes.statusText}`);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('API /admin/save error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
