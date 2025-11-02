# How to Install PostGIS on Windows

## Option 1: Install PostgreSQL with PostGIS Bundle (Recommended)

1. **Download PostgreSQL with PostGIS Stack Builder:**
   - Go to: https://www.postgresql.org/download/windows/
   - Download PostgreSQL installer (latest version)
   - During installation, make sure to select "PostGIS" in the components list
   - OR use Stack Builder (included in PostgreSQL installation) to add PostGIS later

2. **Alternative: Direct PostGIS Installer:**
   - Visit: https://postgis.net/windows_downloads/
   - Download the PostGIS installer that matches your PostgreSQL version
   - Run the installer and select your PostgreSQL installation

## Option 2: Using Package Manager (Chocolatey)

If you have Chocolatey installed:

```powershell
# Install PostgreSQL first
choco install postgresql

# Then install PostGIS
choco install postgis
```

## Option 3: Using Docker (Easiest for Development)

```powershell
docker run --name postgis-db -e POSTGRES_PASSWORD=yourpassword -p 5432:5432 -d postgis/postgis
```

## After Installation

1. **Start PostgreSQL Service:**
   ```powershell
   Start-Service postgresql-x64-15  # Adjust version number as needed
   ```

2. **Connect to PostgreSQL:**
   ```powershell
   psql -U postgres
   ```

3. **Create your database:**
   ```sql
   CREATE DATABASE what_to_eat_ai;
   \c what_to_eat_ai
   ```

4. **Enable PostGIS extension:**
   ```sql
   CREATE EXTENSION IF NOT EXISTS postgis;
   ```

5. **Verify PostGIS is installed:**
   ```sql
   SELECT PostGIS_version();
   ```

## Troubleshooting

### If psql is not recognized:
- Add PostgreSQL bin directory to your PATH:
  - Default location: `C:\Program Files\PostgreSQL\<version>\bin`
  - Add it to System Environment Variables > PATH

### If PostGIS extension error:
- Make sure you're installing PostGIS version that matches your PostgreSQL version
- Run the SQL as a superuser (usually `postgres` user)
- Check if PostGIS is actually installed:
  ```sql
  SELECT * FROM pg_available_extensions WHERE name = 'postgis';
  ```

### Check PostgreSQL Version:
```powershell
Get-Service | Where-Object {$_.Name -like "*postgres*"}
```

## Quick Test

After installation, run your `database.sql` file:

```powershell
psql -U postgres -d what_to_eat_ai -f database.sql
```

Or connect and run manually:
```powershell
psql -U postgres -d what_to_eat_ai
```

Then paste the contents of `database.sql`.

