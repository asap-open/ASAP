import { useEffect, useState } from "react";
import { api } from "../../../utils/api";
import { useAuth } from "../../../context/AuthContext";
import { Trophy } from "lucide-react";

export default function PersonalBests() {
  const { token } = useAuth();
  const [pbs, setPbs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await api.get("progress/pbs", token);
        setPbs(res);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [token]);

  return (
    <section className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-text-muted mb-4 flex items-center gap-2">
        <Trophy size={16} className="text-yellow-500" />
        Personal Bests
      </h3>

      {loading ? (
        <div className="text-center py-4 text-xs text-text-muted">
          Loading...
        </div>
      ) : (
        <div className="space-y-3">
          {pbs.length === 0 ? (
            <p className="text-sm text-text-muted">
              No personal bests recorded yet.
            </p>
          ) : (
            pbs.map((pb, i) => (
              <div
                key={i}
                className="flex justify-between items-center py-2 border-b border-slate-50 last:border-0"
              >
                <div>
                  <p className="font-medium text-text-primary text-sm">
                    {pb.exercise}
                  </p>
                  <p className="text-xs text-text-muted">
                    {new Date(pb.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="font-bold text-primary">{pb.weight} kg</div>
              </div>
            ))
          )}
        </div>
      )}
    </section>
  );
}
