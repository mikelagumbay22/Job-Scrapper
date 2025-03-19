export async function getProxyList(): Promise<string[]> {
  try {
    const response = await fetch('https://raw.githubusercontent.com/TheSpeedX/PROXY-List/master/http.txt');
    const text = await response.text();
    return text.split('\n').filter(proxy => proxy.trim());
  } catch (error) {
    console.error('Error fetching proxy list:', error);
    return [];
  }
}

export async function testProxy(proxy: string): Promise<boolean> {
  try {
    const response = await fetch(`/api/proxy?proxy=${encodeURIComponent(proxy)}&url=https://www.linkedin.com`);
    const data = await response.json();
    return data.success;
  } catch {
    return false;
  }
}

export async function getWorkingProxy(): Promise<string | null> {
  const proxies = await getProxyList();
  for (const proxy of proxies) {
    if (await testProxy(proxy)) {
      return proxy;
    }
  }
  return null;
}
